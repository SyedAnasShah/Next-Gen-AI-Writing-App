# Django REST Framework + Angular Application

This codebase was created to demonstrate a fully fledged fullstack application built with **Django REST Framework + Angular**.

---

## How It Works

> See how the Medium.com clone (called Conduit) is built using Django REST Framework and Angular.

---

## Getting Started

### Prerequisites
Ensure you have Python 3 and Node.js installed on your system. The current project dependency versions are:
- Python 3.10
- Django 5
- Angular 18

---

### Installation

#### 1. Frontend: Choose 1 of 2 ways below:
- Install frontend dependencies and start frontend locally:
    ```shell
    npm --prefix=frontend install
    npm --prefix=frontend start
    ```
    This command will install and start the Angular development server. You can access the Angular application through your web browser at `http://localhost:4200`.

- Install and build frontend as static files (Choose this if you don't want to make any changes to the Frontend project):
    ```shell
    npm --prefix=frontend install
    npm --prefix=frontend run build
    ```

#### 2. Backend:
- Set up a virtual environment:
    ```shell
    # Install environment and dependencies
    python3 -m venv .venv
    source .venv/bin/activate

    # or use this command on Windows
    python3 -m venv .venv
    .venv/Scripts/activate
    ```

- Install backend dependencies:
    ```shell
    pip install -r backend/requirements.txt
    ```

- Apply database migrations:
    ```shell
    # Apply migrations
    python backend/manage.py migrate
    ```

- Run the Django development server:
    ```shell
    # Run server
    python backend/manage.py runserver
    ```

Now, your local server should be running, and you can access this Django/Angular application through your web browser at [http://localhost:8000](http://localhost:8000).

---

### Additional Configuration

#### **Add AI Key**
To enable AI functionality, ensure you add your AI key in the `backend/ai/views.py` file at the designated location.

#### **TODO**
- Integrate Quill Editor: There are some issues in the current component implementation that need to be addressed.

---

Enjoy building and exploring this fullstack project! 🚀
