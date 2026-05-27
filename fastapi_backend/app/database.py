import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# Local default stays project-root sqlite DB.
# On Vercel, use /tmp (the only writable location at runtime).
DEFAULT_DB_URL = "sqlite:///./app.db"
if os.getenv("VERCEL"):
    DEFAULT_DB_URL = "sqlite:////tmp/app.db"

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", DEFAULT_DB_URL)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
