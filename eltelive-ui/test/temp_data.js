ADMIN_USER = {
    givenName: 'admin',
    familyName: 'admin',
    email: 'admin@admin.com',
    password: 'admin'
}

TEST1_USER = {
    givenName: 'test1',
    familyName: 'test1',
    email: 'test1@test.com',
    password: 'test123'
}

TEST2_USER = {
    givenName: 'test2',
    familyName: 'test2',
    email: 'test2@test.com',
    password: 'test4566'
}

GIVEN_NAME_MISSING_USER = {
    givenName: '',
    familyName: 'test',
    email: 'test@test.com',
    password: 'test123'
}

FAMILY_NAME_MISSING_USER = {
    givenName: 'test',
    familyName: '',
    email: 'test@test.com',
    password: 'test123'
}

EMAIL_MISSING_USER = {
    givenName: 'test',
    familyName: 'test',
    email: '',
    password: 'test123'
}

PASSWORD_MISSING_USER = {
    givenName: 'test',
    familyName: 'test',
    email: 'test@test.com',
    password: ''
}

INVALID_EMAIL_USER = {
    givenName: 'test',
    familyName: 'test',
    email: 'test',
    password: 'test123'
}

TOO_SMALL_PASSWORD_USER = {
    givenName: 'test',
    familyName: 'test',
    email: 'test@test.com',
    password: 'test'
}

module.exports ={ ADMIN_USER,
                  TEST1_USER,
                  TEST2_USER,
                  GIVEN_NAME_MISSING_USER,
                  FAMILY_NAME_MISSING_USER, 
                  EMAIL_MISSING_USER,
                  PASSWORD_MISSING_USER,
                  INVALID_EMAIL_USER,
                  TOO_SMALL_PASSWORD_USER }