"""empty message

Revision ID: f3dec99d5b0d
Revises: 653a0c4cc725
Create Date: 2024-05-22 14:26:01.261949

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f3dec99d5b0d'
down_revision = '653a0c4cc725'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hability', schema=None) as batch_op:
        batch_op.alter_column('effect',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.create_foreign_key(None, 'rarity', ['effect'], ['energy_required'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hability', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('effect',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###