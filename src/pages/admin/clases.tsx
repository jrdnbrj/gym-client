import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const clases = () => {

    const router = useRouter();

    const currentRole = useSelector(state => state.user.currentRole);

    useEffect(() => {
        if (currentRole !== 'admin')
            router.push('/calendario'); 
    }, [currentRole]);

    return (
        <>
            <h1>Clases</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Curabitur eget nisi euismod, aliquet nisi id, porttitor 
                ligula. Nulla facilisi. Etiam euismod, ante nec vulputate 
                porta, nunc nunc maximus nunc, eget tincidunt eros 
                eros eget ipsum.
            </p>
        </>
    );
}


export default clases;