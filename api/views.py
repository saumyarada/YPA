from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.permissions import AllowAny
# from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
import os
import nzpy
import pyodbc , json, logging
from django.http import JsonResponse

logger = logging.getLogger(__name__)

@api_view(['POST'])
# @csrf_exempt
@ensure_csrf_cookie
@permission_classes([AllowAny])
def combined(request):
    # LSS Database connection string
    DB_ODBC_CONN_STR = (
    "DRIVER={ODBC Driver 17 for SQL Server};" # Example: Adjust for your driver
    "SERVER=LSSDB.cn.ca;"
    "DATABASE=LSS;"
    "UID=GenID-LSS-SQL;"
    "PWD=drvm98HYel;"
    )

    data = request.data
    start_date = data.get('start_date') 
    end_date = data.get('end_date') 
    dwell_type = data.get('dwell_type') 
    terminal = data.get('terminal') 
    enabled = data.get('enabled')
    

    db_conn = None
    try:
        # --- Connect to the Database and Query ---
        logger.info(f"Attempting to connect to DB with: {DB_ODBC_CONN_STR.split(';')[0]}...")
        db_conn = pyodbc.connect(DB_ODBC_CONN_STR)
        cursor = db_conn.cursor()

        # SQL query with two WHERE clauses and '?' placeholders for pyodbc.
        # Assuming your table is named 'Products' and has columns 'id', 'product_name', 'category', 'price'.
        sql_query = """
        EXEC [dbo].[sp_LSS_YPA] 
        ?
        , ?
        , ?
        , ?
        , ?
        """
        
        # Execute the query, passing parameters as a tuple/list
        logger.info(f"Executing query: '{sql_query}' with params: [{start_date}, {end_date}, {dwell_type}, {terminal},{enabled}]")
        cursor.execute(sql_query, start_date, end_date, dwell_type, terminal, enabled)
        
        # Fetch all results
        raw_results = cursor.fetchall()
        logger.info(f"Raw query results: {raw_results}")

        # Convert raw results (tuples) into a list of dictionaries for easier JSON serialization
        # Assuming column order: id, product_name, category, price
        column_names = [column[0] for column in cursor.description] # Get column names from cursor description
        formatted_results = []
        for row in raw_results:
            formatted_results.append(dict(zip(column_names, row)))

        return JsonResponse({
            'message': 'Data successfully retrieved from single query!',
            'data': formatted_results,
            'source_db': 'YourODBCDatabase' # You can make this dynamic if needed
        })

    except pyodbc.Error as ex:
        sqlstate = ex.args[0]
        logger.error(f"ODBC Error (SQLSTATE: {sqlstate}): {ex}", exc_info=True)
        return JsonResponse({'error': f'Database error occurred: {str(ex)}'}, status=500)
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}", exc_info=True)
        return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)
    finally:
        # Ensure connection is closed
        if db_conn:
            db_conn.close()
            logger.info("Database connection closed.")