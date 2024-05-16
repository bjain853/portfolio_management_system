#!./env/bin/python3

from dotenv import load_dotenv

import os
import sqlalchemy
import pandas as pd
import yfinance as yf
import uuid

load_dotenv()

user = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")
dbname = os.getenv("DB_NAME")
host = os.getenv("DB_HOST")
tickerFile = os.getenv("TICKER_FILE")

engine = sqlalchemy.create_engine(f"mysql+mysqlconnector://{user}:{password}@{host}/{dbname}")
f = open(tickerFile,"r")
tickers = [ticker.strip() for ticker in f.readlines()]

def getData(tickers):
    data = []
    for ticker in tickers:
        ticker_df = yf.download(ticker).reset_index()
        ticker_df = ticker_df.assign(name=ticker,category="Stock")
        ticker_df['id'] = [str(uuid.uuid4()) for _ in range(len(ticker_df.index))]
        ticker_df.columns = ticker_df.columns.str.lower()
        ticker_df.rename(columns={"adj close":"adj_close"},inplace=True)
        ticker_df = ticker_df.loc[:,["id","name","category","date","open","close","high","low","adj_close","volume"]]
        data.append(ticker_df)
    return data

tickerPricesDF = pd.concat(getData(tickers))
tickerPricesDF.to_sql('securities',engine,if_exists="append",chunksize=100000,index=False)
