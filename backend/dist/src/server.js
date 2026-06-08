"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
let patients = [
    {
        id: '1',
        patientName: 'Arun Kumar',
        uhid: '123456789',
        department: 'Cardiology',
        admissionDate: '2026-05-10',
        days: 5,
        diagnosis: 'Acute Myocardial Infarction with severe chest pain, elevated troponin levels and reduced left ventricular function',
        status: 'CRITICAL',
    },
    {
        id: '2',
        patientName: 'Rahul Das',
        uhid: '123456789',
        department: 'Pulmonology',
        admissionDate: '2026-05-08',
        days: 7,
        diagnosis: 'Severe bilateral pneumonia with hypoxia, productive cough and oxygen support requirement',
        status: 'CRITICAL',
    },
    {
        id: '3',
        patientName: 'John Mathew',
        uhid: '123456789',
        department: 'ICU',
        admissionDate: '2026-05-09',
        days: 6,
        diagnosis: 'Septic shock with persistent hypotension, multi-organ dysfunction and ventilator support',
        status: 'CRITICAL',
    },
    {
        id: '4',
        patientName: 'Nikhil Raj',
        uhid: '123456789',
        department: 'Cardiology',
        admissionDate: '2026-05-07',
        days: 8,
        diagnosis: 'Congestive heart failure with pedal edema, breathlessness and reduced ejection fraction',
        status: 'HIGH RISK',
    },
    {
        id: '5',
        patientName: 'Joseph Varghese',
        uhid: '123456789',
        department: 'ICU',
        admissionDate: '2026-05-03',
        days: 12,
        diagnosis: 'Multi organ failure involving renal, respiratory and circulatory systems requiring intensive monitoring',
        status: 'CRITICAL',
    },
    {
        id: '6',
        patientName: 'Rohit Menon',
        uhid: '123456789',
        department: 'Cardiology',
        admissionDate: '2026-05-01',
        days: 14,
        diagnosis: 'Cardiac arrhythmia with intermittent palpitations, dizziness and irregular heart rhythm',
        status: 'STABLE',
    },
    {
        id: '7',
        patientName: 'Daniel James',
        uhid: '123456789',
        department: 'Pulmonology',
        admissionDate: '2026-05-06',
        days: 9,
        diagnosis: 'Acute respiratory distress syndrome with severe hypoxemia and mechanical ventilation support',
        status: 'CRITICAL',
    },
    {
        id: '8',
        patientName: 'Naveen Babu',
        uhid: '123456789',
        department: 'ICU',
        admissionDate: '2026-05-02',
        days: 13,
        diagnosis: 'Sepsis with elevated inflammatory markers, hypotension and altered sensorium',
        status: 'CRITICAL',
    },
    {
        id: '9',
        patientName: 'Priya Suresh',
        uhid: '123456789',
        department: 'Neurology',
        admissionDate: '2026-05-05',
        days: 10,
        diagnosis: 'Bacterial meningitis with neck stiffness, severe headache and altered mental status',
        status: 'CRITICAL',
    },
    {
        id: '10',
        patientName: 'Anita George',
        uhid: '123456789',
        department: 'General Medicine',
        admissionDate: '2026-05-13',
        days: 2,
        diagnosis: 'Malaria with intermittent chills, fever spikes and mild hepatosplenomegaly',
        status: 'STABLE',
    },
    {
        id: '11',
        patientName: 'Meera Joseph',
        uhid: '123456789',
        department: 'Neurology',
        admissionDate: '2026-05-01',
        days: 14,
        diagnosis: 'Acute ischemic brain stroke with right-sided weakness, slurred speech and uncontrolled hypertension',
        status: 'CRITICAL',
    },
    {
        id: '12',
        patientName: 'Anjali Nair',
        uhid: '123456789',
        department: 'Nephrology',
        admissionDate: '2026-05-11',
        days: 4,
        diagnosis: 'Acute kidney injury secondary to dehydration with elevated creatinine and electrolyte imbalance',
        status: 'HIGH RISK',
    },
    {
        id: '13',
        patientName: 'Fathima Ali',
        uhid: '123456789',
        department: 'General Medicine',
        admissionDate: '2026-05-13',
        days: 2,
        diagnosis: 'Dengue fever with thrombocytopenia, high-grade fever and dehydration symptoms',
        status: 'HIGH RISK',
    },
    {
        id: '14',
        patientName: 'Sandra Thomas',
        uhid: '123456789',
        department: 'Pulmonology',
        admissionDate: '2026-05-04',
        days: 11,
        diagnosis: 'COVID-19 viral pneumonia with respiratory distress and high oxygen dependency',
        status: 'CRITICAL',
    },
    {
        id: '15',
        patientName: 'Amina Basheer',
        uhid: '123456789',
        department: 'Neurology',
        admissionDate: '2026-05-12',
        days: 3,
        diagnosis: 'Generalized seizure disorder with recurrent episodes and postictal confusion',
        status: 'HIGH RISK',
    },
    {
        id: '16',
        patientName: 'Greeshma Nair',
        uhid: '123456789',
        department: 'General Medicine',
        admissionDate: '2026-05-14',
        days: 1,
        diagnosis: 'Typhoid fever confirmed by blood culture with abdominal pain and persistent fever',
        status: 'STABLE',
    },
    {
        id: '17',
        patientName: 'Sumi George',
        uhid: '123456789',
        department: 'Nephrology',
        admissionDate: '2026-05-08',
        days: 7,
        diagnosis: 'Chronic renal failure with fluid overload, anemia and dialysis dependency',
        status: 'CRITICAL',
    },
    {
        id: '18',
        patientName: 'Tony Mathew',
        uhid: '123456789',
        department: 'ICU',
        admissionDate: '2026-05-11',
        days: 4,
        diagnosis: 'Respiratory failure with carbon dioxide retention requiring BiPAP ventilation support',
        status: 'CRITICAL',
    },
    {
        id: '19',
        patientName: 'Vijay Kumar',
        uhid: '123456789',
        department: 'Cardiology',
        admissionDate: '2026-05-09',
        days: 6,
        diagnosis: 'Cardiogenic shock following myocardial infarction with low blood pressure and poor perfusion',
        status: 'CRITICAL',
    },
    {
        id: '20',
        patientName: 'Suresh Das',
        uhid: '123456789',
        department: 'Pulmonology',
        admissionDate: '2026-05-07',
        days: 8,
        diagnosis: 'COPD exacerbation with wheezing, productive cough and increased oxygen requirement',
        status: 'HIGH RISK',
    },
];
// Socket.io connection
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});
// API Routes
app.get('/api/patients', (req, res) => {
    res.json(patients);
});
app.get('/api/patients/:id', (req, res) => {
    const patient = patients.find((p) => p.id === req.params.id);
    if (patient) {
        res.json(patient);
    }
    else {
        res.status(404).json({ message: 'Patient not found' });
    }
});
app.post('/api/patients', (req, res) => {
    const newPatient = {
        ...req.body,
        id: Math.random().toString(36).substring(2, 9),
    };
    patients.push(newPatient);
    io.emit('patient-created', newPatient);
    res.status(201).json(newPatient);
});
app.put('/api/patients/:id', (req, res) => {
    const index = patients.findIndex((p) => p.id === req.params.id);
    if (index !== -1) {
        patients[index] = { ...patients[index], ...req.body, id: req.params.id };
        io.emit('patient-updated', patients[index]);
        res.json(patients[index]);
    }
    else {
        res.status(404).json({ message: 'Patient not found' });
    }
});
app.delete('/api/patients/:id', (req, res) => {
    const index = patients.findIndex((p) => p.id === req.params.id);
    if (index !== -1) {
        const deletedPatient = patients.splice(index, 1)[0];
        io.emit('patient-deleted', { id: req.params.id });
        res.json(deletedPatient);
    }
    else {
        res.status(404).json({ message: 'Patient not found' });
    }
});
// User API Routes
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const db = (0, database_1.getDB)();
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
        }
        else if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
        }
        else {
            const match = await bcryptjs_1.default.compare(password, user.password_hash);
            if (match) {
                if (user.status !== 'Active') {
                    res.status(403).json({ message: 'Account is inactive' });
                }
                else {
                    // Exclude password_hash from response
                    const { password_hash, profile_picture, ...userProfile } = user;
                    res.json({ ...userProfile, profilePicture: profile_picture });
                }
            }
            else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        }
    });
});
app.post('/api/auth/change-password', async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;
    const db = (0, database_1.getDB)();
    db.get('SELECT * FROM users WHERE id = ?', [userId], async (err, user) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
        }
        else if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            const match = await bcryptjs_1.default.compare(currentPassword, user.password_hash);
            if (match) {
                const salt = await bcryptjs_1.default.genSalt(10);
                const hashedPassword = await bcryptjs_1.default.hash(newPassword, salt);
                db.run('UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [hashedPassword, userId], function (err) {
                    if (err) {
                        res.status(500).json({ message: 'Database error' });
                    }
                    else {
                        res.json({ message: 'Password updated successfully' });
                    }
                });
            }
            else {
                res.status(401).json({ message: 'Incorrect current password' });
            }
        }
    });
});
app.get('/api/users', (req, res) => {
    const db = (0, database_1.getDB)();
    db.all('SELECT id, full_name as fullName, username, designation, status, email, profile_picture as profilePicture, created_at FROM users', [], (err, rows) => {
        if (err)
            res.status(500).json({ message: 'Database error' });
        else
            res.json(rows);
    });
});
app.post('/api/users', async (req, res) => {
    const { fullName, username, password, designation, status, email, profilePicture } = req.body;
    const db = (0, database_1.getDB)();
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const id = (0, uuid_1.v4)();
        db.run('INSERT INTO users (id, full_name, username, password_hash, designation, status, email, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id, fullName, username, hashedPassword, designation, status, email, profilePicture], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    res.status(400).json({ message: 'Username already exists' });
                }
                else {
                    res.status(500).json({ message: 'Database error' });
                }
            }
            else {
                res.status(201).json({ id, fullName, username, designation, status, email, profilePicture });
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
app.put('/api/users/:id', async (req, res) => {
    const { fullName, username, password, designation, status, email, profilePicture } = req.body;
    const id = req.params.id;
    const db = (0, database_1.getDB)();
    try {
        if (password) {
            const salt = await bcryptjs_1.default.genSalt(10);
            const hashedPassword = await bcryptjs_1.default.hash(password, salt);
            db.run('UPDATE users SET full_name = ?, username = ?, password_hash = ?, designation = ?, status = ?, email = ?, profile_picture = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [fullName, username, hashedPassword, designation, status, email, profilePicture, id], function (err) {
                if (err)
                    res.status(500).json({ message: 'Database error' });
                else
                    res.json({ id, fullName, username, designation, status, email, profilePicture });
            });
        }
        else {
            db.run('UPDATE users SET full_name = ?, username = ?, designation = ?, status = ?, email = ?, profile_picture = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [fullName, username, designation, status, email, profilePicture, id], function (err) {
                if (err)
                    res.status(500).json({ message: 'Database error' });
                else
                    res.json({ id, fullName, username, designation, status, email, profilePicture });
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const db = (0, database_1.getDB)();
    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err)
            res.status(500).json({ message: 'Database error' });
        else
            res.json({ message: 'User deleted' });
    });
});
const PORT = 5000;
(0, database_1.initDB)().then(() => {
    server.listen(PORT, () => {
        console.log(`Backend server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
