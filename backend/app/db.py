from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

connection_string = "mysql+mysqlconnector://cloudhacks:password@localhost/cloudhacks"
engine = create_engine(connection_string, echo=True, pool_size=20, max_overflow=0)

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()