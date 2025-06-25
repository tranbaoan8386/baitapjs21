export function validate(data) {
    const errors = [];

    if (!data.name || data.name.trim() === "") {
        errors.push("Tên sản phẩm không được để trống.");
    }

    if (isNaN(data.price) || data.price <= 0) {
        errors.push("Giá sản phẩm phải là số lớn hơn 0.");
    }

    if (!data.screen || data.screen.trim() === "") {
        errors.push("Thông tin màn hình không được để trống.");
    }

    if (!data.backCamera || data.backCamera.trim() === "") {
        errors.push("Back Camera không được để trống.");
    }

    if (!data.frontCamera || data.frontCamera.trim() === "") {
        errors.push("Front Camera không được để trống.");
    }

    if (!data.img || data.img.trim() === "") {
        errors.push("Ảnh không được để trống.");
    }

    if (!data.desc || data.desc.trim() === "") {
        errors.push("Mô tả không được để trống.");
    }

    if (!data.type || data.type === "Chọn loại sản phẩm") {
        errors.push("Vui lòng chọn loại sản phẩm.");
    }

    return errors;
}