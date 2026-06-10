const renderProfile = (user) => {
    const profilePage = document.querySelector(".profile-page");
    profilePage.innerHTML = `
        <section class="profile-card">
            <div class="profile-header">
                <img
                    id="profile-avatar"
                    class="profile-avatar"
                    src="${user.image}"
                    alt="avatar"
                />

                <div class="profile-basic">
                    <h1 id="full-name">
                        ${user.firstName + " " + user.lastName}
                    </h1>

                    <p id="username" class="username">@${user.username}</p>

                    <span id="role" class="role-badge">${user.role}</span>
                </div>
            </div>

            <div class="profile-content">
                <div class="profile-section">
                    <h2>Personal Info</h2>

                    <div class="info-grid">
                        <div class="info-item">
                            <span> First Name </span>
                            <p id="first-name">${user.firstName}</p>
                        </div>

                        <div class="info-item">
                            <span> Last Name </span>
                            <p id="last-name">${user.lastName}</p>
                        </div>

                        <div class="info-item">
                            <span> Age </span>
                            <p id="age">${user.age}</p>
                        </div>

                        <div class="info-item">
                            <span> Gender </span>
                            <p id="gender">${user.gender}</p>
                        </div>

                        <div class="info-item">
                            <span> Birth Date </span>
                            <p id="birth-date">${user.birthDate}</p>
                        </div>

                        <div class="info-item">
                            <span> Blood Group </span>
                            <p id="blood-group">${user.bloodGroup}</p>
                        </div>

                        <div class="info-item">
                            <span> Height </span>
                            <p id="height">${user.height}cm</p>
                        </div>

                        <div class="info-item">
                            <span> Weight </span>
                            <p id="weight">${user.weight}kg</p>
                        </div>
                    </div>
                </div>

                <div class="profile-section">
                    <h2>Contact</h2>

                    <div class="info-grid">
                        <div class="info-item">
                            <span> Email </span>
                            <p id="email">${user.email}</p>
                        </div>

                        <div class="info-item">
                            <span> Phone </span>
                            <p id="phone">${user.phone}</p>
                        </div>

                        <div class="info-item full-width">
                            <span> Address </span>
                            <p id="address">${user.address.address}, ${user.address.city}, ${user.address.country}</p>
                        </div>
                    </div>
                </div>

                <div class="profile-section">
                    <h2>Company</h2>

                    <div class="info-grid">
                        <div class="info-item">
                            <span> Company </span>
                            <p id="company-name">${user.company.name}</p>
                        </div>

                        <div class="info-item">
                            <span> Department </span>
                            <p id="department">${user.company.department}</p>
                        </div>

                        <div class="info-item">
                            <span> Position </span>
                            <p id="job-title">${user.company.title}</p>
                        </div>

                        <div class="info-item">
                            <span> University </span>
                            <p id="university">${user.university}</p>
                        </div>
                    </div>
                </div>

                <button id="logout-btn" class="logout-btn">Logout</button>
            </div>
        </section>
    `;
};

export { renderProfile };
