import {test} from '../../src/fixtures/firstFixture'

test('10.1 Custom Fixture @Userfixtures', async({userInfo})=>{
    
    console.log(
        `Username: ${userInfo.username}\n`+
        `Age: ${userInfo.age}\n`+
        `IsAdmin: ${userInfo.isAdmin}\n`
    );

});


test('10.2 Custom Fixture @Userfixtures', async({credentials})=>{
    
    console.log(
        `Username: ${credentials.username}\n`+
        `Password: ${credentials.password}\n`
    );

});