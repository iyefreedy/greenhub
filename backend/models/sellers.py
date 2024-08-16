from models.base import Base
from sqlalchemy.orm import mapped_column
from sqlalchemy import Float, Integer, String, Text, DateTime, func
import bcrypt
class Sellers(Base):
    __tablename__ = 'sellers'
    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    store_address = mapped_column(String(100))
    store_name = mapped_column(String(100))
    store_city = mapped_column(String(100))
    store_category = mapped_column(String(100))
    seller_balance = mapped_column(Float(100))  
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    # role = mapped_column(String(100))
    updated_at = mapped_column(DateTime(timezone=True),server_default=func.now(),onupdate=func.utc_timestamp())
