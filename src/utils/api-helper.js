import axios from "axios";
export const BASE_URL = "https://cicd-2-backend.vercel.app/api/";

export const AUTH_GET = (url, suc, fail, fin) => {
    if (!localStorage.getItem('token')) {
        return {
            data: {},
            status: 401,
            message: "Unauthorized"
        }
    }
    return axios.get(`${BASE_URL}${url}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        },
    }).then(res => {
        if (res.status === 200  && !!suc) {
            suc(res);
        }

        return {
            data: res.data,
            status: res.status,
            message: res.statusText
        };
    }).catch(err => {
        if (!!fail) {
            fail(err);
        }

        return {
            data: {},
            status: err.response?.status || 500,
            message: err.response?.statusText || "Server Error"
        };
    }).finally(() => {
        if (!!fin) {
            fin();
        }
    });
}
const noAction = function(){};

export const AUTH_POST = (url, data, suc=noAction, fail=noAction, fin=noAction) => {
    if (!localStorage.getItem('token')) {
        return {
            data: {},
            status: 401,
            message: "Unauthorized"
        }
    }
    return axios.post(`${BASE_URL}${url}`, data, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        },
    }).then(res => {
        if (res.status === 200  && !!suc) {
            suc(res);
        }

        return {
            data: res.data,
            status: res.status,
            message: res.statusText
        };
    }).catch(err => {
        if (!!fail) {
            fail(err);
        }

        return {
            data: {},
            status: err.response?.status || 500,
            message: err.response?.statusText || "Server Error"
        };
    }).finally(() => {
        if (!!fin) {
            fin();
        }
    });
}

export const AUTH_PUT = (url, id, data, suc=noAction, fail=noAction, fin=noAction) => {
    if (!localStorage.getItem('token')) {
        return {
            data: {},
            status: 401,
            message: "Unauthorized"
        }
    }
    return axios.put(`${BASE_URL}${url}${id}/`, data, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        },
    }).then(res => {
        if (res.status === 200  && !!suc) {
            suc(res);
        }

        return {
            data: res.data,
            status: res.status,
            message: res.statusText
        };
    }).catch(err => {
        if (!!fail) {
            fail(err);
        }

        return {
            data: {},
            status: err.response?.status || 500,
            message: err.response?.statusText || "Server Error"
        };
    }).finally(() => {
        if (!!fin) {
            fin();
        }
    });
}

export const AUTH_GET_ONE = (url, id, suc=noAction, fail=noAction, fin=noAction) => {
    if (!localStorage.getItem('token')) {
        return {
            data: {},
            status: 401,
            message: "Unauthorized"
        }
    }
    if (!id) {
        return {
            data: {},
            status: 400,
            message: "Bad Request"
        }
    }

    return axios.get(`${BASE_URL}${url}${id}/`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        },
    }).then(res => {
        if (res.status === 200  && !!suc) {
            suc(res);
        }

        return {
            data: res.data,
            status: res.status,
            message: res.statusText
        };
    }).catch(err => {
        if (!!fail) {
            fail(err);
        }

        return {
            data: {},
            status: err.response?.status || 500,
            message: err.response?.statusText || "Server Error"
        };
    }).finally(() => {
        if (!!fin) {
            fin();
        }
    });
}

export const AUTH_DELETE_ONE = (url, id, suc=noAction, fail=noAction, fin=noAction) => {
    if (!localStorage.getItem('token')) {
        return {
            data: {},
            status: 401,
            message: "Unauthorized"
        }
    }
    if (!id) {
        return {
            data: {},
            status: 400,
            message: "Bad Request"
        }
    }

    return axios.delete(`${BASE_URL}${url}${id}/`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        },
    }).then(res => {
        if (res.status === 204  && !!suc) {
            suc(res);
        }

        return {
            data: res.data,
            status: res.status,
            message: res.statusText
        };
    }).catch(err => {
        if (!!fail) {
            fail(err);
        }

        return {
            data: {},
            status: err.response?.status || 500,
            message: err.response?.statusText || "Server Error"
        };
    }).finally(() => {
        if (!!fin) {
            fin();
        }
    });

}