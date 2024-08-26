import { Card, Row, Col } from 'antd';
import React from 'react';
import Button from '../Button';
import { toast } from 'react-toastify';

const Cards = () => {

  const resetBalance = () => {
    toast.success('Balance Reset Successfully!');
  }

  const addIncome = () => {
    toast.success('Income Added Successfully!');
  }

  const addExpense = () => {
    toast.success('Expense Added Successfully!');
  }

  return (
    <div className="p-4 no-srollbar">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card className='shadow-md border-2 h-auto text-xl' title='Balance'>
            <p className='mb-6 px-1'>Rs. 0</p>
            <Button text={"Reset Balance"} onClick={resetBalance} blue={false} />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card className='shadow-md border-2 h-auto text-xl' title='Income'>
            <p className='mb-6 px-1'>Rs. 0</p>
            <Button text={"Add Income"} onClick={addIncome} blue={true} />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card className='shadow-md border-2 h-auto text-xl' title='Expenses'>
            <p className='mb-6 px-1'>Rs. 0</p>
            <Button text={"Add Expense"} onClick={addExpense} blue={true} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cards;
