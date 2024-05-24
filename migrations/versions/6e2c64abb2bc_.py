"""empty message

Revision ID: 6e2c64abb2bc
Revises: 
Create Date: 2024-05-24 16:47:44.367282

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6e2c64abb2bc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
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
    op.create_table('role',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=True),
    sa.Column('passive', sa.String(length=120), nullable=False),
    sa.Column('hability_1', sa.String(length=120), nullable=False),
    sa.Column('hability_2', sa.String(length=120), nullable=False),
    sa.Column('hability_3', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('hability_1'),
    sa.UniqueConstraint('hability_2'),
    sa.UniqueConstraint('hability_3'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('passive')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=True),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=80), nullable=False),
    sa.Column('user_role', sa.Integer(), nullable=True),
    sa.Column('level', sa.Integer(), nullable=True),
    sa.Column('experience', sa.Integer(), nullable=True),
    sa.Column('energy', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_role'], ['role.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
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
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('task',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('label', sa.String(length=120), nullable=False),
    sa.Column('task_difficulty_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['task_difficulty_id'], ['difficulty.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('task')
    op.drop_table('reward')
    op.drop_table('bestiary')
    op.drop_table('user')
    op.drop_table('role')
    op.drop_table('rarity')
    op.drop_table('difficulty')
    # ### end Alembic commands ###
