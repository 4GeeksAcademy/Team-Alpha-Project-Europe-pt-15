"""empty message

Revision ID: e28100e295b3
Revises: b5a5a0818b76
Create Date: 2024-05-12 21:00:33.093476

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e28100e295b3'
down_revision = 'b5a5a0818b76'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('level', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('experience', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('energy', sa.Integer(), nullable=True))
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
        batch_op.drop_column('user_energy')
        batch_op.drop_column('user_experience')
        batch_op.drop_column('user_level')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_level', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('user_experience', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('user_energy', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
        batch_op.drop_column('energy')
        batch_op.drop_column('experience')
        batch_op.drop_column('level')

    # ### end Alembic commands ###
