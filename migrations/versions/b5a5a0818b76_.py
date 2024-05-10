"""empty message

Revision ID: b5a5a0818b76
Revises: 0c5966c26207
Create Date: 2024-05-09 15:38:32.793548

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b5a5a0818b76'
down_revision = '0c5966c26207'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('clas',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('passive', sa.String(length=120), nullable=False),
    sa.Column('hablity_1', sa.String(length=120), nullable=False),
    sa.Column('hability_2', sa.String(length=120), nullable=False),
    sa.Column('hability_3', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('hability_2'),
    sa.UniqueConstraint('hability_3'),
    sa.UniqueConstraint('hablity_1'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('passive')
    )
    op.create_table('difficulty',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('difficulty_name', sa.String(length=120), nullable=False),
    sa.Column('experience_given', sa.Integer(), nullable=False),
    sa.Column('energy_given', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('difficulty_name'),
    sa.UniqueConstraint('energy_given'),
    sa.UniqueConstraint('experience_given')
    )
    op.create_table('rarity',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rarity_name', sa.String(length=120), nullable=False),
    sa.Column('energy_required', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('energy_required'),
    sa.UniqueConstraint('rarity_name')
    )
    op.create_table('bestiary',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('monster_name', sa.String(length=120), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reward',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('label', sa.String(length=120), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('rarity_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['rarity_id'], ['rarity.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('label')
    )
    op.create_table('task',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('label', sa.String(length=120), nullable=False),
    sa.Column('task_difficulty_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['task_difficulty_id'], ['difficulty.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('label')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('user_class', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('user_level', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('user_experience', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('user_energy', sa.Integer(), nullable=True))
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=80),
               existing_nullable=False)
        batch_op.drop_constraint('user_email_key', type_='unique')
        batch_op.create_unique_constraint(None, ['name'])
        batch_op.create_foreign_key(None, 'clas', ['user_class'], ['id'])
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.create_unique_constraint('user_email_key', ['email'])
        batch_op.alter_column('email',
               existing_type=sa.String(length=80),
               type_=sa.VARCHAR(length=120),
               existing_nullable=False)
        batch_op.drop_column('user_energy')
        batch_op.drop_column('user_experience')
        batch_op.drop_column('user_level')
        batch_op.drop_column('user_class')
        batch_op.drop_column('name')

    op.drop_table('task')
    op.drop_table('reward')
    op.drop_table('bestiary')
    op.drop_table('rarity')
    op.drop_table('difficulty')
    op.drop_table('clas')
    # ### end Alembic commands ###