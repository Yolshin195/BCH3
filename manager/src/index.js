module.exports = {
    /*
     * client api
     */
    setModel: () => {},

    getStatus: () => {},
    getListServers: () => {}

    /*
     * @param{json} config
     */
    runTask: (config) => {},

    /*
     * worker api
     */

    /*
     * @param{json} config
     */
    registerWorker: ({ip, port, modelName}) => {}

}
