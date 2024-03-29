"""renaming ratings to detect schema change

Revision ID: 9be4fe8a1585
Revises: e9fc1b5ff2d4
Create Date: 2024-02-29 09:14:53.159497

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '9be4fe8a1585'
down_revision = 'e9fc1b5ff2d4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rating', postgresql.ARRAY(sa.Integer()), nullable=True))
        batch_op.drop_column('ratings')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('ratings', postgresql.ARRAY(sa.INTEGER()), autoincrement=False, nullable=True))
        batch_op.drop_column('rating')

    # ### end Alembic commands ###
