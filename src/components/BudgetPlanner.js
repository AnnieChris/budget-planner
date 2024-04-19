import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

function BudgetPlanner() {
    const [budget, setBudget] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [inputExpense, setInputExpense] = useState('');
    const [inputAmount, setInputAmount] = useState('');
    const [editedExpense, setEditedExpense] = useState('');
    const [editedAmount, setEditedAmount] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [chartKey, setChartKey] = useState(0);
    const [prevExpense, setPrevExpense] = useState(null);

    const handleExpenseChange = (e) => {
        setInputExpense(e.target.value);
    };

    const handleAmountChange = (e) => {
        setInputAmount(e.target.value);
    };

    const addExpense = () => {
        if (inputExpense && inputAmount) {
            setExpenses([...expenses, { expense: inputExpense, amount: inputAmount }]);
            setInputExpense('');
            setInputAmount('');
            setChartKey(prevKey => prevKey + 1);

        }
    };

    const editExpense = (index) => {
        const newExpense = editedExpense.trim();
        const newAmount = editedAmount.trim();
        if (newExpense && newAmount && index !== null) {
            const updatedExpenses = [...expenses];
            updatedExpenses[index] = { expense: newExpense, amount: newAmount };
            setExpenses(updatedExpenses);
            setEditedExpense('');
            setEditedAmount('');
            setEditIndex(null);
            setChartKey(prevKey => prevKey + 1);
        }
    };
    const deleteExpense = (index) => {
        const newExpenses = [...expenses];
        newExpenses.splice(index, 1);
        setExpenses(newExpenses);
        setChartKey(prevKey => prevKey + 1);
    };
    const cancelExpenses = () => {
        if (prevExpense && editIndex !== null) {
            const updatedExpenses = [...expenses];
            updatedExpenses[editIndex] = { expense: prevExpense.expense, amount: prevExpense.amount };
            setExpenses(updatedExpenses);
        }

        // Reset states
        setEditedExpense('');
        setEditedAmount('');
        setEditIndex(null);
    };

    const totalExpenses = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const balance = budget - totalExpenses;

    const expenseLabels = expenses.map((expense) => expense.expense);
    const expenseAmounts = expenses.map((expense) => parseFloat(expense.amount));
    return (
        <Container fluid="md">
            <h1 className="text-center mt-3">Budget Planner</h1>
            <Row>
                <Col xs={3}>
                    <Form.Group controlId="budget">
                        <Form.Label>Budget:</Form.Label>
                        <Form.Control
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(parseInt(e.target.value))}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Form.Group controlId="expense">
                        <Form.Control
                            type="text"
                            placeholder="Expense"
                            value={inputExpense}
                            onChange={handleExpenseChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="amount">
                        <Form.Control
                            type="number"
                            placeholder="Amount"
                            value={inputAmount}
                            onChange={handleAmountChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Button variant="primary" onClick={addExpense}>Add Expense</Button>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={8}>
                <h2>Expenses</h2>
                    <ListGroup>
                        {expenses.map((expense, index) => (
                            <ListGroup.Item key={index}>
                                {index === editIndex ? (
                                    <>
                                    {expense.expense} - ${expense.amount}
                                        <Form.Control
                                            type="text"
                                            placeholder="Expense"
                                            value={editedExpense}
                                            onChange={(e) => setEditedExpense(e.target.value)}
                                        />
                                        <Form.Control
                                            type="number"
                                            placeholder="Amount"
                                            value={editedAmount}
                                            onChange={(e) => setEditedAmount(e.target.value)}
                                        />
                                        <Button variant="success" onClick={() => editExpense(index)}>Save</Button>
                                        <Button variant="warning" onClick={cancelExpenses} >Cancel</Button>
                                        
                                    </>
                                ) : (
                                    <>
                                        {expense.expense} - ${expense.amount}
                                        <Button variant="info" onClick={() => setEditIndex(index)}>Edit</Button>
                                        <Button variant="danger" onClick={() => deleteExpense(index)}>Delete</Button>
                                    </>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Total Expenses: ${totalExpenses}</h2>
                    {/* {isNaN(balance) || balance < 0 ? null : <h2>Balance : $ {balance}</h2>} */}
                    {isNaN(balance) ? null : <h2>Balance : $ {balance}</h2>}
                </Col>
            </Row>
        </Container>
    );
}

export default BudgetPlanner;
