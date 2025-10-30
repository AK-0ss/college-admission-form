document.getElementById('admissionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Get selected radio button value
    data.gender = document.querySelector('input[name="gender"]:checked')?.value;
    
    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        const messageDiv = document.getElementById('message');
        
        if (result.success) {
            messageDiv.className = 'message success';
            messageDiv.textContent = result.message;
            messageDiv.style.display = 'block';
            e.target.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = result.message;
            messageDiv.style.display = 'block';
        }
    } catch (error) {
        const messageDiv = document.getElementById('message');
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Error submitting application. Please try again.';
        messageDiv.style.display = 'block';
    }
});
