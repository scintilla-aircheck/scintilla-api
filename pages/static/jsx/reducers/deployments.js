const deployments = (state = {deployments:[], current_deployment: {}}, action) => {
    switch (action.type) {
        case 'SELECT_DEPLOYMENT':

            return {
                ...state,
                current_deployment: action.deployment
            };
        case 'DEPLOYMENTS_PENDING':
            return state;
        case 'DEPLOYMENTS_REJECTED':
            return state;
        case 'DEPLOYMENTS_FULFILLED':
            return {
                ...state,
                deployments: action.payload.data.results
            };
        default:
            return state
    }
};

export default deployments