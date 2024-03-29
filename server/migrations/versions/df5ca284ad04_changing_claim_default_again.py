"""changing claim default again

Revision ID: df5ca284ad04
Revises: 95e8e2ee504e
Create Date: 2024-02-22 16:09:00.093410

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'df5ca284ad04'
down_revision = '95e8e2ee504e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('claims', schema=None) as batch_op:
        batch_op.add_column(sa.Column('selected', sa.Boolean(), server_default='false', nullable=False))
        batch_op.drop_column('select')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('claims', schema=None) as batch_op:
        batch_op.add_column(sa.Column('select', sa.BOOLEAN(), server_default=sa.text('false'), autoincrement=False, nullable=False))
        batch_op.drop_column('selected')

    # ### end Alembic commands ###
