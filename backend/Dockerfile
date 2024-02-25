FROM python:3.9
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir flask flask-cors requests python-dotenv
EXPOSE 4000
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=4000

CMD ["flask", "run", "--debug"]
