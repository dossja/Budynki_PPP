FROM python:3.9
# ENV PYTHONUNBUFFERED 1
COPY . /app
EXPOSE 5000
WORKDIR /app
# COPY requirements.txt /app
RUN pip install -r requirements.txt
# COPY . /app
CMD python run.py