from sqlalchemy import Column, Integer, String, Boolean, Date
from database import Base

class DailyGoal(Base):
    __tablename__ = "daily_goals"
    id = Column(Integer, primary_key=True)
    date = Column(Date)
    goal_text = Column(String)
    estimated_time = Column(Integer)
    completed = Column(Boolean, default=False)
