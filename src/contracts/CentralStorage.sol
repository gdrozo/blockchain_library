pragma solidity ^0.5.0;

contract CentralStorage {

    mapping(address => bool) private administrators;
    mapping(address => bool) private validEditors;
    mapping(address => bool) private invalidatedEditors;
    

    struct File {
        string hash;
        string title;
        uint timestamp;
        string description;
    }

    struct Publication {
        address editor;
        string title;
        string description;
        string creationHash;
        string category;
        uint timestamp;
    }
    
    mapping(uint => File[]) public files;

    Publication[] public publications;

    constructor() public{
        administrators[msg.sender] = true;
        validEditors[msg.sender] = true;
    }

    event publicationAdded(
        address indexed editor,
        uint timestamp,
        uint id
    );

    //hash of the initial data send and the user address 
    //returns the id of the publication
    function publish(string calldata title, string calldata description, string calldata hash, string calldata category) external editorOnly() returns (uint) {
        
        Publication memory publication;
        publication.title = title;
        publication.description = description;
        publication.editor = msg.sender;
        publication.timestamp = block.timestamp;
        publication.creationHash = hash;
        publication.category = category;

        publications.push(publication);

        emit publicationAdded(msg.sender, block.timestamp, publications.length-1);
        return publications.length-1;
    }


    function addFiles(uint publicationId, string calldata fileTitle, string calldata fileHash, string calldata description) external editorOnly(){

        require(publications[publicationId].editor == msg.sender);

        File memory newFile;

        newFile.title = fileTitle;
        newFile.hash = fileHash;
        newFile.timestamp = block.timestamp;
        newFile.description = description;

        files[publicationId].push(newFile);
    }

    // Returns:
    // 1. the editors address
    // 2. the publication title
    // 3. the publication description
    // 4. the creation hash (hash(description + editor address))
    // 5. the timestamp of the publication
    // 6. the number of files in the publication
    // Note: Use the funtion getFile to get an specific file from the publication
    function getPublication(uint id) view external returns(address, string memory, string memory, string memory, uint, uint,string memory) {
        return (publications[id].editor, publications[id].title, publications[id].description, publications[id].creationHash, publications[id].timestamp, files[id].length, publications[id].category);
    }

    function getNumberOfPublications() view external returns(uint){
        return publications.length;
    }

    // Returns:
    // 1. file hash
    // 2. file title
    // 3. tiemstap of the file  
    // 3. description of the file  
    // Note: Use the funtion getPublication to get more info about the publication
    function getFile(uint publicationId, uint fileId) view external returns (string memory, string memory, uint, string memory){
        return (files[publicationId][fileId].hash, files[publicationId][fileId].title, files[publicationId][fileId].timestamp, files[publicationId][fileId].description);
    }

    function addAdmin(address newAdmin) external adminOnly(){
        administrators[newAdmin] = true;
    }

    function addEditor(address newEditor) public adminOnly(){
        validEditors[newEditor] = true;
    }

    function isEditor(address _address) view external returns (bool) {
        return validEditors[_address];
    }

    function isAdmin(address a) view external returns (bool){
        return (administrators[a]);
    }

    function invalidateEditor(address editor) external adminOnly {
        validEditors[editor] = false;
        invalidatedEditors[editor] = true;
    }

    modifier adminOnly() {
        require(administrators[msg.sender], "There is no authorization to access this resource.");
        _;
    }

    modifier editorOnly() {
        require(validEditors[msg.sender], "There is no authorization to access this resource.");
        _;
    }    
}
