export const devServerApiURL = () => ('http://localhost:5000/api/v2/captioning')
export const deployServerApiURL = () => ('http://ec2-54-191-104-126.us-west-2.compute.amazonaws.com/api/v2/captioning')
export const iLearnURL = () => ('https://ilearn.support.at.sfsu.edu/ay2021/course/view.php?id=')
export const fileDownloadUrl = () => ("http://localhost:5000/api/v2/captioning/services/download/file")
export const astJobURL = () =>  ("https://web.automaticsync.com/show_details.php?show_id=")
export const devServerUrl = () => ("http:localhost:5000")
export const deployURL = () => ("http://ec2-54-191-104-126.us-west-2.compute.amazonaws.com/")
export const currentSemester = () => ("sp21")


function environment(value) {
    if (value === true) {
        return deployServerApiURL()
    } else {
        return devServerApiURL()

    }
}


// true for deployed false for dev

let env_value = process.env.ENV_VALUE




export const endpoint = () => (environment(env_value))