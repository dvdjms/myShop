# Generated by Django 4.2.7 on 2023-11-24 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product', models.CharField(max_length=32)),
                ('category', models.CharField(max_length=32)),
                ('price', models.FloatField()),
            ],
        ),
        migrations.DeleteModel(
            name='UserTest',
        ),
    ]