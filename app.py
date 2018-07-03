from flask import Flask, render_template
from flask_environments import Environments


def create_app():
    application = Flask(__name__)

    return application

app = create_app()


@app.route('/')
def main():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(port=5005)
