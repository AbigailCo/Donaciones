import React from 'react';

const Masthead = () => {
    return (
        <header className="masthead">
            <div className="container px-4 px-lg-5 h-100">
                <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div className="col-lg-8 align-self-end">
                        <h1 className="text-white font-weight-bold">DAR VUELVE</h1>
                        <hr className="divider" />
                    </div>
                    <div className="col-lg-8 align-self-baseline">
                        <p className="text-white-75 mb-5">Te ayudamos a llegar mas lejos para poder lograr tus metas, te mostramos a cuantos podes ayudar.</p>
                        <a className="btn btn-primary btn-xl" href="#campañas">Estas son nuestras campañas</a>
                       
                    </div>
                </div>
                
            </div>
        </header>
    );
};

export default Masthead;
