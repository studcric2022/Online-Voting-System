


export default function useAuth() {

    const token = localStorage.getItem('token');

    if(token===null) return false;
    return true;
 }