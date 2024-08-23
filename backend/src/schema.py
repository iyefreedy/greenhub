register_schema = {
    'first_name': {"required": True, "empty": False},
    'last_name': {"required": True, "empty": False},
    'email': {"required": True, "empty": False},
    'password': {"required": True, "empty": False, "min": 8},
    'confirm_password': {"required": True, "empty": False, "min": 8}
}

login_schema = {
    'email': {"required": True, "empty": False},
    'password': {"required": True, "empty": False, "min": 8},
}
