const people = [
      // Predefined student details with unique IDs
      { id: "student1", name: "Student 1", age: 12, gender: "Male" },
      { id: "student2", name: "Student 2", age: 11, gender: "Female" },
      { id: "student3", name: "Student 3", age: 12, gender: "Male" },
      { id: "student4", name: "Student 4", age: 10, gender: "Female" },
      { id: "student5", name: "Student 5", age: 11, gender: "Male" }
    ];

    let teacherLoggedIn = false;
    let studentLoggedIn = false;

    // Function to handle teacher login (add your teacher authentication logic here)
    function teacherLogin() {
      const teacherId = document.getElementById('teacherId').value;
      const teacherPassword = document.getElementById('teacherPassword').value;

      // Add your teacher login validation here
      if (teacherId === "teacher" && teacherPassword === "password") {
        // Teacher login successful, show teacher dashboard and hide login form
        teacherLoggedIn = true;
        document.getElementById('loginForm').style.display = "none";
        document.getElementById('teacherDashboard').style.display = "block";
        populateStudentDetails();
      } else {
        alert("Invalid credentials! Please try again.");
      }
    }

    // Function 
    // Function to populate student details in the teacher dashboard
    function populateStudentDetails() {
      const studentDetailsDiv = document.getElementById('studentDetails');
      studentDetailsDiv.innerHTML = '';
    
      people.forEach(student => {
        const studentDiv = document.createElement('div');
        studentDiv.className = 'student';
        studentDiv.innerHTML = `
          <label for="${student.id}">${student.name} (${student.age} years, ${student.gender})</label>
          <input type="radio" name="${student.id}" value="Present">Present
          <input type="radio" name="${student.id}" value="Absent">Absent
        `;
        studentDetailsDiv.appendChild(studentDiv);
      });
    }
    
    // Function to handle student login (add your student authentication logic here)
    function studentLogin() {
      const studentId = document.getElementById('studentId').value;
      // Add your student login validation here
      const student = people.find(person => person.id === studentId);
    
      if (student) {
        // Student login successful, show student dashboard and hide login form
        studentLoggedIn = true;
        document.getElementById('loginForm').style.display = "none";
        document.getElementById('studentDashboard').style.display = "block";
        document.getElementById('studentName').textContent = student.name;
        document.getElementById('studentAge').textContent = student.age;
        document.getElementById('studentGender').textContent = student.gender;
      } else {
        alert("Invalid credentials! Please try again.");
      }
    }
    
    // Function to handle attendance submission by the teacher
    function submitAttendance() {
      if (!teacherLoggedIn) {
        alert("Please log in as a teacher to submit attendance.");
        return;
      }
    
      const date = document.getElementById('date').value;
      const thought = document.getElementById('thought').value;
    
      // Get student attendance details from the form and store them in an array
      const studentAttendances = [];
      people.forEach(student => {
        const attendance = document.querySelector(`input[name="${student.id}"]:checked`);
        if (attendance) {
          studentAttendances.push({
            id: student.id,
            name: student.name,
            attendance: attendance.value
          });
        }
      });
    
      // Add your logic to handle the attendance data, e.g., store it in a database or perform other operations
    
      // Show attendance summary report and hide other sections
      document.getElementById('teacherDashboard').style.display = "none";
      document.getElementById('summaryReport').style.display = "block";
    
      // Populate the summary report table
      const summaryTableBody = document.querySelector('#summaryReport tbody');
      summaryTableBody.innerHTML = '';
    
      for (const studentAttendance of studentAttendances) {
        const totalPresent = studentAttendance.attendance === 'Present' ? 1 : 0;
        const totalAbsent = studentAttendance.attendance === 'Absent' ? 1 : 0;
    
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${studentAttendance.name}</td>
          <td>${totalPresent}</td>
          <td>${totalAbsent}</td>
        `;
        summaryTableBody.appendChild(row);
      }
        }
