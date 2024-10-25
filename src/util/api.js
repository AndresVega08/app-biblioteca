import axios from "axios";

export const createAxiosInstance = (accessToken, customConfig = {}) => {
    return axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            "Content-type": "application/json",
            "token": `Bearer ${accessToken}`,
        },
        ...customConfig,
    });

}


export const getBooks = async () => {
    const customApiInstance = createAxiosInstance();
    try {
        const response = await customApiInstance.get("/books/listar");
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
}


export const SignIn = async (userCredential, dispatch, history) => {
    dispatch({ type: "LOGIN_START" });
    const customApiInstance = createAxiosInstance();
    try {
        const response = await customApiInstance.post("/auth/login", userCredential);
        const user = response.data.data;
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        user.isAdmin ? history("/admin/dashboard") : history("/");
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
};

export const getReservasCountMonth = async () => {
    const customApiInstance = createAxiosInstance();
    try {
        const response = await customApiInstance.get("/reports/cantidadReMes");
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
};

export const getCountBooksRegister = async () => {
    const customApiInstance = createAxiosInstance();
    try {
        const response = await customApiInstance.get("/reports/cantidadLb");
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
};

export const getBookMostReserv = async () => {
    const customApiInstance = createAxiosInstance();
    try {
        const response = await customApiInstance.get("/reports/libroMasRe");
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
};

export const getBook = async (id) => {
    const customApiInstance = createAxiosInstance();
    try {
        const response = await customApiInstance.get(`/books/encontrar/${id}`);
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
};

export const createBook = async (accessToken, data, notification) => {
    const customApiInstance = createAxiosInstance(accessToken);
    try {
        const response = await customApiInstance.post("/books/agregar", data);
        notification.success("Libro creado correctamente")
        return response.data;

    } catch (error) {
        notification.error("Ha ocurrido un error")
        console.error('error fetching data:', error);
    }
}

export const updateBook = async (accessToken, id, data, notification) => {
    const customApiInstance = createAxiosInstance(accessToken);
    try {
        const response = await customApiInstance.put("/books/actualizar/" + id, data);
        notification.success("Libro actualizado correctamente")
        return response.data;

    } catch (error) {
        notification.error("Ha ocurrido un error")
        console.error('error fetching data:', error);
    }
}

export const deleteBook = async (accessToken, id, notification) => {
    const customApiInstance = createAxiosInstance(accessToken);
    try {
        const response = await customApiInstance.delete("/books/borrar/" + id);
        notification.success("Libro eliminado correctamente")
        return response.data;

    } catch (error) {
        notification.error("Ha ocurrido un error")
        console.error('error fetching data:', error);
    }
}

export const getReservas = async (query = false) => {
    const customApiInstance = createAxiosInstance(null, query && { params: { isNew: query } });
    try {
        const response = await customApiInstance.get("/reserva/listar");
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
};

export const createReservation = async (accessToken, data, notification) => {
    const customApiInstance = createAxiosInstance(accessToken);
    try {
        const response = await customApiInstance.post("/reserva/agregar", data);
        notification.success("Reserva creada correctamente")

        return response.data;

    } catch (error) {
        notification.error(error.response.data.message)
        console.error('error fetching data:', error);
    }
}

export const getAllUsers = async (accessToken) => {
    const customApiInstance = createAxiosInstance(accessToken);
    try {
        const response = await customApiInstance.get("/users/");
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
};

export const createUser = async (data, notification) => {
    const customApiInstance = createAxiosInstance();
    try {
        const response = await customApiInstance.post("/auth/register", data);
        notification.success("Usuario creado correctamente")

        return response.data;

    } catch (error) {
        notification.error(error.response.data.message)
        console.error('error fetching data:', error);
    }

}

export const getUser = async (id, accessToken) => {
    const customApiInstance = createAxiosInstance(accessToken);
    try {
        const response = await customApiInstance.get(`/users/find/${id}`);
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
};

export const updateUser = async (accessToken, id, data, notification) => {
    const customApiInstance = createAxiosInstance(accessToken);
    try {
        const response = await customApiInstance.put(`/users/update/${id}`, data);
        notification.success("Usuario actualizado correctamente")
        return response.data;

    } catch (error) {
        notification.error("Ha ocurrido un error")
        console.error('error fetching data:', error);
    }

}

// generar reporte
export const getReport = async (accessToken, notification) => {
    const customApiInstance = createAxiosInstance(accessToken);
    try {
        const response = await customApiInstance.get("/reports/infoReservas", {
            responseType: 'arraybuffer'
        });
        notification.success("Reporte generado correctamente");

        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Reservas.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);

        return response.data;
    } catch (error) {
        notification.error("Ha ocurrido un error");
        console.error('error fetching data:', error);
    }
};