import { LocalUrl } from "../urls/urls";
import axiosInstance from "axios";

const apiSettings = {

createSystemEntry: async (data) => {
    let form_data = new FormData();
    if (data.logo)
        form_data.append("logo", data.logo, data.logo.name);
    if (data.home_page_image)
        form_data.append("home_page_image", data.home_page_image, data.home_page_image.name);
    form_data.append("name", data.name);
    form_data.append("description", data.description);
    form_data.append("email", data.email);
    form_data.append("password", data.password);
    form_data.append("type", data.type);
    form_data.append("theme", data.theme);
    form_data.append("has_price", data.has_price);
    form_data.append("has_img_service", data.has_img_service);
    form_data.append("has_img_item", data.has_img_item);
    form_data.append("has_description_service", data.has_description_service);
    form_data.append("has_description_item", data.has_description_item);
    form_data.append("has_large_number", data.has_large_number);
    form_data.append("has_email", data.has_email);
    form_data.append("paymentType", data.paymentType);
    for (var i = 0; i < data.attributes.length; i++){
        form_data.append('attributes', data.attributes[i])
    }



const myNewModel = await axiosInstance
        .post(LocalUrl + `systems/`, form_data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
            },
        }).then((res) => {
            return res;
        }).catch((error) => {
            return error.response;
        });

    if (myNewModel.status === 201) {
        window.location.href = `/profile/`;
    }
    return myNewModel;
    },
};

export default apiSettings;