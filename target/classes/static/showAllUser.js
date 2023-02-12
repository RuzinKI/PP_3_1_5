async function getAllUser() {
    const res = await fetch("http://localhost:8080/api");
    const users = await res.json();

    users.forEach(user => {
        addUser(user);
    });

    // if (document.getElementById('currentUserId'))
}



function addUser(user) {
    usersToHTML(user);
    newUserDelete(user);
    newUserEdit(user);
}

window.addEventListener('DOMContentLoaded', getAllUser);

function usersToHTML({id, email, age, firstName, lastName, roles}) {
    const tbody = document.getElementById('data');
    let strRole = '';

    if (roles !== undefined) {
        roles.forEach((role) => {
            strRole += role.name + ' ';
        })
    }


    tbody.insertAdjacentHTML('beforeend', `
    <tr id="user${id}" >
        <td>${id}</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${age}</td>
        <td>${email}</td>
        <td>${strRole}</td>
        <td>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-info" data-toggle="modal"
                data-target="#edit${id}" onclick="editUserData(${id})">Edit
            </button>
        </td>
        <td>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-danger" data-toggle="modal"
                data-target="#delete${id}" onclick="deleteUserData(${id})" >Delete
            </button>
        </td>
    </tr>`)
}




function newUserDelete({id, email, age, firstName, lastName, roles}) {

    const tbody = document.getElementById('myDeleteBlock');

    let strRole = `
        `;
    roles.forEach((role) => {
        strRole = strRole + `<option value=${role.id} name="${role.name}" >${role.name}</option>`;
    })
    strRole = strRole + `
        `;

    let textHtmlDel = `
    <div class="modal fade" id="delete${id}" data-backdrop="static" data-keyboard="false"
         tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <form id="formDelete">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete user</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body w-50 p-3" style="margin: auto; text-align: center">
                        <div class="form-group">
                            <label class="font-weight-bold" for="dId">ID</label>
                            <input type="text" class="form-control" id="dId" placeholder="id" readonly
                                   name="id" value="${id}"/>
                        </div>
                        <div class="form-group">
                            <label class="font-weight-bold" for="dFirstname">First name</label>
                            <input type="text" class="form-control" id="dFirstname" placeholder="first name"
                                   readonly name="firstName" value="${firstName}"/>
                        </div>
                        <div class="form-group">
                            <label class="font-weight-bold" for="dSurname">Last name</label>
                                <input type="text" class="form-control" id="dLastname" placeholder="last name"
                                       readonly name="lastName" value="${lastName}"/>
                        </div>
                        <div class="form-group">
                            <label class="font-weight-bold" for="dAge">Age</label>
                            <input type="number" class="form-control" id="dAge" placeholder="Age" readonly
                                   name="age" value="${age}"/>
                        </div>
                        <div class="form-group">
                            <label class="font-weight-bold" for="dEmail">Email</label>
                            <input type="text" class="form-control" id="dEmail" placeholder="email"
                                   readonly name="email" value="${email}"/>
                        </div>
                        <div class="form-group">
                            <label class="font-weight-bold" for="dRoles">Role</label>
                            <select class="custom-select form-control" id="dRoles" multiple disabled size="2"
                                    name="roleList" readonly>`
        + strRole +
        `                   </select>
                        </div>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" id="delete-user-button${id}">Delete</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    `

    tbody.insertAdjacentHTML('beforeend', textHtmlDel)
}


function newUserEdit({id, email, age, firstName, lastName, roles}) {

    const tbody = document.getElementById('myEditBlock');

    let textHtmlEd = `
    <div class="modal fade" id="edit${id}" data-backdrop="static" data-keyboard="false"
         tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <form id="formEdit">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Edit user</h5>
                        <button type="button" class="close" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body w-50 p-3" style="margin: auto; text-align: center">
                        <div class="form-group">
                            <label class="font-weight-bold" htmlFor="eId">ID</label>
                            <input type="text" class="form-control" id="eId${id}" readOnly name="id" value="${id}"/>
                        </div>
                        <div class="form-group">
                            <label class="font-weight-bold" htmlFor="eFirstname${id}">First name</label>
                            <input type="text" class="form-control" id="eFirstname${id}" placeholder="first name"
                                   name="firstname" value="${firstName}"/>
                        </div>
                        <div class="form-group">
                            <label class="font-weight-bold" htmlFor="eLastname${id}">Last name</label>
                            <input type="text" class="form-control" id="eLastname${id}" placeholder="last name"
                                   name="lastname" value="${lastName}"/>
                        </div>
                        <div class="form-group">
                            <label class="font-weight-bold" htmlFor="eAge${id}">Age</label>
                            <input type="number" class="form-control" id="eAge${id}" placeholder="Age" name="age"
                                   value="${age}"/>
                        </div>
                        <div class="form-group">
                            <label class="font-weight-bold" htmlFor="eEmail${id}">Username</label>
                            <input type="text" class="form-control" id="eEmail${id}" placeholder="email"
                                   name="email" value="${email}"/>
                        </div>
                        <label class="font-weight-bold" htmlFor="ePassword${id}">Password</label>
                        <input type="password" id="ePassword${id}" class="form-control"
                               aria-describedby="passwordHelpBlock" name="password" autoComplete="off"
                               value=""/>
                        <div class="form-group">
                            <label htmlFor="eRoles${id}" class="form-label fw-bold">Roles</label>
                                <select class="custom-select form-control" id="eRoles${id}" multiple size="2"
                                        name="roleList">
                                    <option value=1 name="ADMIN" >ADMIN</option>
                                    <option value=2 name="USER"  >USER</option>
                               </select>
                        </div>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" id="edit-user-button${id}" class="btn btn-primary">Edit</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    `

    tbody.insertAdjacentHTML('beforeend', textHtmlEd)
}