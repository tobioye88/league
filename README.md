# League

## START APPLICATION

### INSTALL DEPENDENCIES
npm i

### RUN APPLICATION IN WATCH MODE
npm run watch

### RUN TEST IN WATCH MODE
npm run test


APPLICATION RUNNING ON PORT:3000

### Documentation
#### Echo
curl --location --request POST 'localhost:3000/echo' \
--form 'file=@"/Users/tobioye/Downloads/matrix.csv"'

#### Invert
curl --location --request POST 'localhost:3000/invert' \
--form 'file=@"/Users/tobioye/Downloads/matrix.csv"'

#### Flatten
curl --location --request POST 'localhost:3000/flatten' \
--form 'file=@"/Users/tobioye/Downloads/matrix.csv"'

#### Sum
curl --location --request POST 'localhost:3000/sum' \
--form 'file=@"/Users/tobioye/Downloads/matrix.csv"'

#### Multiply
curl --location --request POST 'localhost:3000/multiply' \
--form 'file=@"/Users/tobioye/Downloads/matrix.csv"'


# League Backend Challenge

In main.go you will find a basic web server written in GoLang. It accepts a single request _/echo_. Extend the webservice with the ability to perform the following operations

Given an uploaded csv file
```
1,2,3
4,5,6
7,8,9
```

1. Echo (given)
    - Return the matrix as a string in matrix format.
    
    ```
    // Expected output
    1,2,3
    4,5,6
    7,8,9
    ``` 
2. Invert
    - Return the matrix as a string in matrix format where the columns and rows are inverted
    ```
    // Expected output
    1,4,7
    2,5,8
    3,6,9
    ``` 
3. Flatten
    - Return the matrix as a 1 line string, with values separated by commas.
    ```
    // Expected output
    1,2,3,4,5,6,7,8,9
    ``` 
4. Sum
    - Return the sum of the integers in the matrix
    ```
    // Expected output
    45
    ``` 
5. Multiply
    - Return the product of the integers in the matrix
    ```
    // Expected output
    362880
    ``` 

The input file to these functions is a matrix, of any dimension where the number of rows are equal to the number of columns (square). Each value is an integer, and there is no header row. matrix.csv is example valid input.  

Run web server
```
go run .
```

Send request
```
curl -F 'file=@/path/matrix.csv' "localhost:8080/echo"
```

## What we're looking for

- The solution runs
- The solution performs all cases correctly
- The code is easy to read
- The code is reasonably documented
- The code is tested
- The code is robust and handles invalid input and provides helpful error messages