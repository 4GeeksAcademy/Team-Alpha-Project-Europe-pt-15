"""empty message

Revision ID: bcb2c4df591a
Revises: a98340a7b05a
Create Date: 2024-05-27 15:20:10.817185

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bcb2c4df591a'
down_revision = 'a98340a7b05a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hability', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rarity_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('hability_energy_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'rarity', ['rarity_id'], ['id'])
        batch_op.drop_column('energy')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hability', schema=None) as batch_op:
        batch_op.add_column(sa.Column('energy', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('hability_energy_fkey', 'rarity', ['energy'], ['id'])
        batch_op.drop_column('rarity_id')

    # ### end Alembic commands ###
