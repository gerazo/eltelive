ADMIN_USER = {
    givenName: 'admin',
    familyName: 'admin',
    email: 'admin@admin.com',
    password: 'admin'
}

TEST_USER = {
    givenName: 'test',
    familyName: 'test',
    email: 'test@test.com',
    password: 'test123'
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

module.exports ={ ADMIN_USER,
                  TEST_USER,
                  GIVEN_NAME_MISSING_USER,
                  FAMILY_NAME_MISSING_USER, 
                  EMAIL_MISSING_USER,
                  PASSWORD_MISSING_USER }