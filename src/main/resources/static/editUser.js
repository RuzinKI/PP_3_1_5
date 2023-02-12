

async function editUserData(idx) {

    document.getElementById(`edit-user-button${idx}`).addEventListener('click', async () => {
        const inputId = document.getElementById(`eId${idx}`);
        const inputFirstName = document.getElementById(`eFirstname${idx}`);
        const inputLastName = document.getElementById(`eLastname${idx}`);
        const inputAge = document.getElementById(`eAge${idx}`);
        const inputEmail = document.getElementById(`eEmail${idx}`);

        const id = inputId.value;
        const firstName = inputFirstName.value;
        const lastName = inputLastName.value;
        const age = inputAge.value;
        const email = inputEmail.value;
        const listRoleEditUser = roleArray(document.getElementById(`eRoles${id}`))

        if (id && firstName && lastName && age && email) {
            const res = await fetch("http://localhost:8080/api", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, firstName, lastName, age, email, roles: listRoleEditUser})
            });
            const result = await res.json();

            document.getElementById(`user${id}`).remove();
            $(`#edit${id}`).modal('toggle');

            document.getElementById(`delete${id}`).remove();
            document.getElementById(`edit${id}`).remove();

            await addUser(result);

            console.log(document.getElementById(`navBarId${id}`))
            console.log(`navBarId${id}`)
            if (document.getElementById(`navBarId${id}`) !== null) {
                editBar(result)
            }
        }
    })
}

function editBar({id, email, age, firstName, lastName, roles}) {
    console.log(id);
    console.log(roles);
    document.getElementById(`navBar`).remove();
    const tbody = document.getElementById('navBarUser');

    let strRole = ' '
    roles.forEach((role) => {
        console.log(`${role.name}`);
        strRole = strRole+ ` ${role.name}`
    })

    let textBar = `
        <ul class="navbar-nav mr-auto" id="navBar">
            <li class="nav-item">
                <span id="navBarId${id}" class="navbar-text text-white font-weight-bold"
                ><strong>${email}</strong>
                </span>
            </li>
            <li class="nav-item">
                <span class="navbar-text text-white"
                      >&nbspwith roles:&nbsp
                </span>
            </li>
            <li class="nav-item">
                <span class="navbar-text text-white">${strRole}
                </span>
            </li>
        </ul>
    `

    tbody.insertAdjacentHTML('beforeend', textBar)
}
