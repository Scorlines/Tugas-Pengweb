document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi dan Muat Data dari LocalStorage
    let tasks = loadTasks();

    // Dapatkan elemen-elemen DOM
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const filterStatus = document.getElementById('filter-status');
    const searchCourse = document.getElementById('search-course');
    const pendingCountSpan = document.getElementById('pending-count');

    // Tampilkan tugas saat pertama kali dimuat
    renderTasks();

    // 2. Fungsi Penyimpanan Lokal
    function saveTasks() {
        // Menyimpan array tugas ke localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updatePendingCount();
    }

    function loadTasks() {
        // Mengambil data dari localStorage. Jika tidak ada, kembalikan array kosong.
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    // 3. Validasi Form
    function validateForm(taskName, taskCourse, taskDeadline) {
        let isValid = true;
        
        // Reset pesan error
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

        // Validasi Nama Tugas
        if (!taskName.trim()) {
            document.getElementById('error-name').textContent = 'Nama tugas tidak boleh kosong.';
            document.getElementById('error-name').style.display = 'block';
            isValid = false;
        }

        // Validasi Mata Kuliah
        if (!taskCourse.trim()) {
            document.getElementById('error-course').textContent = 'Mata kuliah tidak boleh kosong.';
            document.getElementById('error-course').style.display = 'block';
            isValid = false;
        }

        // Validasi Deadline (pastikan tanggal di masa depan atau hari ini)
        const deadlineDate = new Date(taskDeadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Atur ke awal hari ini untuk perbandingan

        if (!taskDeadline) {
             document.getElementById('error-deadline').textContent = 'Deadline harus diisi.';
             document.getElementById('error-deadline').style.display = 'block';
             isValid = false;
        } else if (deadlineDate < today) {
            document.getElementById('error-deadline').textContent = 'Deadline tidak boleh di masa lalu.';
            document.getElementById('error-deadline').style.display = 'block';
            isValid = false;
        }

        return isValid;
    }

    // 4. Menambahkan Tugas Baru
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('task-name');
        const courseInput = document.getElementById('task-course');
        const deadlineInput = document.getElementById('task-deadline');

        const taskName = nameInput.value;
        const taskCourse = courseInput.value;
        const taskDeadline = deadlineInput.value;

        if (validateForm(taskName, taskCourse, taskDeadline)) {
            const newTask = {
                id: Date.now(), // ID unik
                name: taskName,
                course: taskCourse,
                deadline: taskDeadline,
                completed: false
            };

            tasks.push(newTask);
            saveTasks(); // Simpan ke localStorage
            renderTasks(); // Render ulang tampilan
            
            // Reset form
            taskForm.reset();
            // Reset error messages (seperti yang dilakukan di validateForm)
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        }
    });

    // 5. Menampilkan Tugas (Rendering)
    function renderTasks() {
        taskList.innerHTML = ''; // Kosongkan daftar tugas

        const filterVal = filterStatus.value;
        const searchVal = searchCourse.value.toLowerCase();

        // Terapkan Filter & Pencarian
        const filteredTasks = tasks.filter(task => {
            const matchesStatus = (filterVal === 'all') || 
                                  (filterVal === 'completed' && task.completed) || 
                                  (filterVal === 'pending' && !task.completed);
            
            const matchesSearch = task.course.toLowerCase().includes(searchVal);
            
            return matchesStatus && matchesSearch;
        });

        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<li style="text-align: center;">Tidak ada tugas yang cocok.</li>';
            updatePendingCount(); // Perbarui statistik bahkan jika kosong
            return;
        }

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : 'pending';
            li.dataset.id = task.id;

            li.innerHTML = `
                <div class="task-info">
                    <h4>${task.name} (${task.course})</h4>
                    <p>Deadline: ${new Date(task.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div class="task-actions">
                    <button class="toggle-complete-btn" data-id="${task.id}">
                        ${task.completed ? 'Batal Selesai' : 'Tandai Selesai'}
                    </button>
                    <button class="delete-btn" data-id="${task.id}">Hapus</button>
                </div>
            `;
            taskList.appendChild(li);
        });

        updatePendingCount();
    }

    // 6. Mengelola Aksi Tugas (Toggle Selesai, Hapus)
    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const taskId = parseInt(target.dataset.id);

        if (target.classList.contains('delete-btn')) {
            // Hapus Tugas
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasks();
            renderTasks();
        } else if (target.classList.contains('toggle-complete-btn')) {
            // Tandai Selesai/Belum Selesai
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed;
                saveTasks();
                renderTasks();
            }
        }
    });

    // 7. Filter dan Pencarian
    filterStatus.addEventListener('change', renderTasks);
    searchCourse.addEventListener('input', renderTasks);

    // 8. Menampilkan Jumlah Tugas Belum Selesai
    function updatePendingCount() {
        const pendingTasks = tasks.filter(task => !task.completed);
        pendingCountSpan.textContent = pendingTasks.length;
    }
});