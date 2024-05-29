"""empty message

Revision ID: 311478e53bed
Revises: 15c42909fe74
Create Date: 2024-05-16 16:56:23.610839

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '311478e53bed'
down_revision = '15c42909fe74'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.drop_constraint('task_label_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.create_unique_constraint('task_label_key', ['label'])

    # ### end Alembic commands ###