using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public QuestionsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                       select qId,question,variant1,variant2,variant3,answer from questions";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RegAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(Questions quest)
        {
            string query = @"
                        insert into questions (question,variant1,variant2,variant3,answer) values
                                                    (@question,@variant1,@variant2,@variant3,@answer);
                        
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RegAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@question", quest.question);
                    myCommand.Parameters.AddWithValue("@variant1", quest.variant1);
                    myCommand.Parameters.AddWithValue("@variant2", quest.variant2);
                    myCommand.Parameters.AddWithValue("@variant3", quest.variant3);
                    myCommand.Parameters.AddWithValue("@answer", quest.answer);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Questions quest)
        {
            string query = @"
                        update questions set 
                        variant1 =@variant1,
                        variant2 =@variant2,
                        variant3 =@variant3,
                        answer=@answer,
                        
                        where qId=@qId;
                        
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RegAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@qId", quest.qId);
                    myCommand.Parameters.AddWithValue("@question", quest.question);
                    myCommand.Parameters.AddWithValue("@variant1", quest.variant1);
                    myCommand.Parameters.AddWithValue("@variant2", quest.variant2);
                    myCommand.Parameters.AddWithValue("@variant3", quest.variant3);
                    myCommand.Parameters.AddWithValue("@answer", quest.answer);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }



        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                        delete from questions 
                        where qId=@qId;
                        
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RegAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@qId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}
