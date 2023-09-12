#!/bin/bash

poetry install && poetry run create_tables && poetry run dev_server