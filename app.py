from flask import Flask, request, session, redirect, url_for, jsonify
import mysql.connector  
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = 'dbms_project.db'

def get_data_from_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM MENTOR")
    rows = cursor.fetchall()

    conn.close()

    columns = [description[0] for description in cursor.description]
    data = [dict(zip(columns,row)) for row in rows]

    return data

def connect_db():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Sairam@12",
        database="new_dbms_project"
    )
    return conn

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()  # Clear all session data
    return '', 200  

@app.route('/api/data')
def data():
    data = get_data_from_db()
    return jsonify(data)

@app.route('/get-data', methods=['GET'])
def get_data():
    conn = connect_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM STUDENT")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)


@app.route('/get-dropdown-data', methods=['GET'])
def get_dropdown_data():
    conn = connect_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT DISTINCT YEAR FROM STUDENT")  
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route('/get-branch-data', methods=['GET'])
def get_branch_data():
    conn = connect_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT DISTINCT BRANCH FROM STUDENT")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)


@app.route('/get-student-data', methods=['GET'])
def get_student_data():
    year = request.args.get('year')
    branch = request.args.get('branch')
    reg_no = request.args.get('reg_no')
    query = """
        SELECT STUDENT.name, STUDENT.reg_no, STUDENT.branch, STUDENT.year, STUDENT.category,
        MENTOR.mentor_id, MENTOR.mentor_name,
        ALLOCATION.status, ALLOCATION.proof, ALLOCATION.marks
        FROM STUDENT LEFT JOIN MENTOR ON STUDENT.mentor_id = MENTOR.mentor_id
        LEFT JOIN ALLOCATION ON STUDENT.reg_no = ALLOCATION.reg_no
        WHERE 1=1
    """
    params = []

    if year:
        query += " AND STUDENT.year = %s"
        params.append(year)
    if branch:
        query += " AND STUDENT.branch = %s"
        params.append(branch)
    if reg_no:
        query += " AND STUDENT.reg_no = %s"
        params.append(reg_no)

    conn = connect_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(query, params)
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)