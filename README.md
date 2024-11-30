# Linux Endpoint Management Portal

- [Linux Endpoint Management Portal](#linux-endpoint-management-portal)
  - [MYSQL Setup](#mysql-setup)
  - [Entra ID Setup](#entra-id-setup)
  - [NextJS Auth Setup](#nextjs-auth-setup)



## MYSQL Setup
To Setup MYSQL for LEMP to use it you need to setup a database for the server to use, as well as a user that has control over that database.
1. Create the database LEMP will be using 
    ```sql
    CREATE DATABASE lemp;
    ```
2. Create a User for LEMP to use. (Replace **password** with a randomly generated password)
    ###### For running on same server
    ```sql
    CREATE USER 'lemp'@'localhost' IDENTIFIED BY 'password';
    ```
    ###### For running on any system 
    ```sql
    CREATE USER 'lemp'@'%' IDENTIFIED BY '<password>';
    ``` 
    ###### For running on a specific system
    ```sql
    CREATE USER 'lemp'@'123.123.123.123' IDENTIFIED BY '<password>';
    ``` 
3. Grant the user access to the lemp database. (Replace **method** with the method you picked above.)
   ```sql
   GRANT ALL on lemp.* to 'lemp'@'<method>';
   ```
## Entra ID Setup

## NextJS Auth Setup

