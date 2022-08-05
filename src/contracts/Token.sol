pragma solidity ^0.8.0;

contract Token{
	string public name="Mytoken";
	string public symbol="MYT";
	uint256 public decimal= 18;
	uint256 public totalSupply=1000000*(10**decimal);
	mapping(address=>uint256) public balanceOf;
	mapping(address=>mapping(address=>uint256)) public allowance;

	event Transfer(address indexed from,address indexed to,uint256 value);
	event Approval(address indexed owner,address indexed spender,uint256 value);
		constructor() public{
			balanceOf[msg.sender]=totalSupply;
		}
		function transfer(address _to,uint256 _value) public returns(bool success){
			require(balanceOf[msg.sender]>=_value);
			_transfer(msg.sender,_to,_value);
			return true;
		}

		function _transfer(address _from,address _to,uint256 _value) internal {
			require(_to!=address(0));
			balanceOf[_from]=balanceOf[_from]-(_value);
			balanceOf[_to]=balanceOf[_to]+(_value);
			emit Transfer(_from,_to,_value);
		}

		function approve(address _spender,uint256 _value) public returns(bool success){
			require(_spender!=address(0));
			allowance[msg.sender][_spender]=_value;
			emit Approval(msg.sender,_spender,_value);
			return true;
		}

		function transferFrom(address _from,address _to,uint256 _value) public returns(bool success){
			 require(_value<=balanceOf[_from]);
			 require(_value<=allowance[_from][msg.sender]);
			 allowance[_from][msg.sender]=allowance[_from][msg.sender]-(_value);
			_transfer(_from,_to,_value);
			return true;
		}
	}