// Gestisce gli errori dell'app tramite questo componente(di ordine superiore) che avvolge BurgerBuilder 
import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {   // classe anonima
        state = {
            error: null
        }
        
        componentWillMount () {
            // interceptor globale per gestire gli errori
            this.reqInterceptor = axios.interceptors.request.use(req => {
                // setto a null lo stato dell'errore ad ogni invio di una nuova richiesta
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }
        
        // Rimuovo gli interceptors 
        componentWillUnmount () {
            //console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    {/* Se si verifica un errore compare la modale col mex di errore dal server */}
                    <Modal 
                        show={this.state.error} 
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;