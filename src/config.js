
export const context = {
    headers: {
        authorization: localStorage.getItem('x-auth-token') || 'aucun'
    }
}