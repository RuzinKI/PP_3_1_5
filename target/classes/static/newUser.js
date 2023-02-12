document.getElementById('addNewUser').addEventListener('click', createUser)

async function createUser() {
    const inputFirstName = document.getElementById('newFirstName');
    const inputLastName = document.getElementById('newLastName');
    const inputAge = document.getElementById('newAge');
    const inputEmail = document.getElementById('newEmail');
    const inputPassword = document.getElementById('newPassword');


    const firstName = inputFirstName.value;
    const lastName = inputLastName.value;
    const age = inputAge.value;
    const email = inputEmail.value;
    const password = inputPassword.value;
    let listRoles = roleArray(document.getElementById('newRoles'));


    if (firstName && lastName && age && email && password && (listRoles.length !== 0)) {
        let res = await fetch("http://localhost:8080/api", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName, lastName, age, email, password, roles: listRoles})
        });
        const result = await res.json();
        addUser(result);
    }

    inputFirstName.value = ''
    inputLastName.value = ''
    inputAge.value = ''
    inputEmail.value = ''
    inputPassword.value = ''
}


let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {
                id: options[i].value,
                name: options[i].text,
            }

            array.push(role)
        }
    }
    return array
}

