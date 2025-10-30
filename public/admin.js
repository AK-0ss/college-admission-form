let isLoggedIn = false;

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const result = await response.json();
        const messageDiv = document.getElementById('loginMessage');
        
        if (result.success) {
            isLoggedIn = true;
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('dashboardSection').style.display = 'block';
            loadStudents();
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = result.message;
            messageDiv.style.display = 'block';
        }
    } catch (error) {
        const messageDiv = document.getElementById('loginMessage');
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Error logging in. Please try again.';
        messageDiv.style.display = 'block';
    }
});

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    isLoggedIn = false;
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('dashboardSection').style.display = 'none';
    document.getElementById('loginForm').reset();
});

// Load Students
async function loadStudents() {
    try {
        const response = await fetch('/api/students');
        const result = await response.json();
        
        if (result.success) {
            const students = result.students;
            document.getElementById('totalStudents').textContent = students.length;
            
            const tbody = document.getElementById('studentsTableBody');
            tbody.innerHTML = '';
            
            students.forEach(student => {
                const row = document.createElement('tr');
                const submittedDate = new Date(student.submittedAt).toLocaleDateString();
                
                row.innerHTML = `
                    <td>${student.fullName}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>${student.course}</td>
                    <td>${student.grade}%</td>
                    <td>${submittedDate}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editStudent('${student.id}')">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteStudent('${student.id}')">Delete</button>
                    </td>
                `;
                
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

// Edit Student
async function editStudent(id) {
    try {
        const response = await fetch('/api/students');
        const result = await response.json();
        
        if (result.success) {
            const student = result.students.find(s => s.id === id);
            
            if (student) {
                document.getElementById('editId').value = student.id;
                document.getElementById('editFullName').value = student.fullName;
                document.getElementById('editEmail').value = student.email;
                document.getElementById('editPhone').value = student.phone;
                document.getElementById('editDob').value = student.dob;
                document.getElementById('editGender').value = student.gender;
                document.getElementById('editAddress').value = student.address;
                document.getElementById('editCourse').value = student.course;
                document.getElementById('editGrade').value = student.grade;
                document.getElementById('editPreviousSchool').value = student.previousSchool;
                
                document.getElementById('editModal').style.display = 'block';
            }
        }
    } catch (error) {
        alert('Error loading student data');
    }
}

// Delete Student
async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/students/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert(result.message);
            loadStudents();
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('Error deleting student');
    }
}

// Edit Form Handler
document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('editId').value;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch(`/api/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert(result.message);
            document.getElementById('editModal').style.display = 'none';
            loadStudents();
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('Error updating student');
    }
});

// Modal Close Handler
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('editModal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('editModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
