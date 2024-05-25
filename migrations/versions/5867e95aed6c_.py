"""empty message

Revision ID: 5867e95aed6c
Revises: f3dec99d5b0d
Create Date: 2024-05-22 14:42:19.895968

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5867e95aed6c'
down_revision = 'f3dec99d5b0d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hability', schema=None) as batch_op:
        batch_op.drop_constraint('hability_effect_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'rarity', ['effect'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hability', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('hability_effect_fkey', 'rarity', ['effect'], ['energy_required'])

    # ### end Alembic commands ###