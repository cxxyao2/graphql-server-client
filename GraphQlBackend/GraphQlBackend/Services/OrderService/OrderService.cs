﻿using GraphQlBackend.Data;
using GraphQlBackend.Entities;
using GraphQlBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace GraphQlBackend.Services
{

    public class OrderService : IOrderService
    {
        private readonly DataContext _context;
        public OrderService(DataContext context)
        {
            _context = context;
        }


        public IQueryable<Order> GetOrders()
        {
            return _context.Orders
                    .Where(c => !c.IsDeleted)
                    .Include(c => c.Customer);

        }

        public async Task<Order> AddOrUpdateOrderAsync(OrderModel orderModel)
        {

            Order order;

            var customer = await _context.Customers
                            .Where(c => c.Id == orderModel.CustomerId)
                            .FirstOrDefaultAsync();

            if (customer == null)
                throw new Exception($"Customer with id {orderModel.CustomerId} does not exist");

            if (orderModel.Id == null)
            {
                order = new Order
                {
                    CustomerId = orderModel.CustomerId,
                    OrderDate = orderModel.OrderDate,
                    Description = orderModel.Description,
                    TotalAmount = orderModel.TotalAmount,
                    DepositAmount = orderModel.TotalAmount,
                    IsDelivery = orderModel.IsDelivery,
                    Status = orderModel.Status,
                    OtherNotes = orderModel.OtherNotes
                };

                await _context.Orders.AddAsync(order);
            }
            else
            {
                order = await _context.Orders
                            .Where(c => c.Id == orderModel.Id)
                            .FirstOrDefaultAsync();

                if (order == null)
                    throw new Exception($"Order with id {orderModel.Id} was not found");

                order.OrderDate = orderModel.OrderDate;
                order.Description = orderModel.Description;
                order.TotalAmount = orderModel.TotalAmount;
                order.DepositAmount = orderModel.DepositAmount;
                order.IsDelivery = orderModel.IsDelivery;
                order.Status = orderModel.Status;
                order.OtherNotes = orderModel.OtherNotes;

                _context.Orders.Update(order);

            }
            await _context.SaveChangesAsync();

            return order;
        }

        public async Task<bool> DeleteOrderAsync(int orderId)
        {


            var order = await _context.Orders
                            .Where(o => o.Id == orderId)
                            .FirstOrDefaultAsync();

            if (order == null)
                throw new Exception($"Order with id {orderId} was not found");

            order.IsDeleted = true;

            _context.Orders.Update(order);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}

